import tornado.httpserver
import tornado.websocket
import tornado.ioloop
import tornado.web
import json
import myDbConnect
import datetime;


class WebsocketHandler(tornado.websocket.WebSocketHandler):
 
 def check_origin(self, origin):
  return True
 def open(self):
  print ("neue Verbindung")
  self.write_message("Verbindung hergestellt")
  global conn
  conn = myDbConnect.connecting()
  
 def on_message(self, message):

  #Database Connection
  
  cursor = conn.cursor()
  
  print(message)
  request = json.loads(message)
  print(request)
  print("%s == bet"%request['get'])
  print(type(request['get']))
  
  # --- Wettplatzierung ---
  if request['get'] == 'bet_set':
   try:
       user = request['user_hash']
       for line in request['bet']:
        e_id = line['event_id']
        country = line['country']
        tokens = line['tokens']

        tokenCheckQuery = """SELECT token FROM user WHERE user_hash = '%s'"""%user
        tokenCheck = queries(tokenCheckQuery, cursor, conn, countResponses = '1')
        print(tokenCheck)
        checkIfDateAppropriateQuery = """SELECT date from event WHERE e_id = '%s'"""%e_id
        checkIfDateAppropriate = queries(checkIfDateAppropriateQuery, cursor, conn, countResponses = '1')
        dateOfEvent = datetime.datetime.strptime( checkIfDateAppropriate, "%Y-%m-%d %H:%M:%S")
        today = datetime.datetime.today()
        if today > dateOfEvent:
           self.write_message(json.dumps({"response":"failure","type":"vouchers_create", "data":""}).encode('utf-8'))
           print("bet can't be placed. event has already ended!")
        else:
            if int(tokenCheck) < int(tokens):
                self.write_message(json.dumps({"response":"failure", "type":"bet_set"}).encode('utf-8'))
                print("NOT ENOUGH TOKENS AVAILABLE")
            else:
                query = """INSERT INTO bets(country_id, user_hash, e_id, tokens) VALUES('%s','%s','%s','%s')"""%(country,user,e_id,tokens)
                print(query)
                queries(query, cursor, conn, readOrWrite = 'w')
                diff = int(tokenCheck)-int(tokens)
                query = """UPDATE user SET token = '%s' WHERE user_hash = '%s'"""%(diff, user)
                queries(query, cursor, conn, readOrWrite = 'w')
                self.write_message(json.dumps({"response":"success", "type":"bet_set"}).encode('utf-8'))
   except Exception:
          print("Error at request for setting bets! Please look for the problem!!!")
          pass

  # --- Wettabfragen ---
  elif request['get'] == 'bets':
   try:
       user = request['user_hash']
       betsInDBQuery = """SELECT * FROM bets WHERE user_hash = '%s'"""%user
       betsInDB = queries(betsInDBQuery, cursor, conn)
       print("Bets in DB: %s"%betsInDB)
       data = []
       for line in betsInDB:
           countryNameQuery = """SELECT name FROM country WHERE c_id = '%s'"""%line[1]
           countryName = queries(countryNameQuery, cursor, conn, countResponses = '1')
           data.append('{"event_id":"%s", "country":"%s", "tokens":"%s"},'%(line[3], countryName, line[4]))
       data = ''.join(data)[:-1]
       data = '{"response":"success", "type":"bets", "data":[%s]}'%data
       print(data)
       self.write_message(data)
   except Exception:
          print("Error at request for set a new event! Please look for the problem!!!")
          pass
  # --- Login ---
  elif request['get'] == 'login':
   try:
       user = request['user_hash']
       country = request['country']
       country_id_finderQuery = ("""SELECT c_id FROM country WHERE name = '%s'""")%country
       country_id = queries(country_id_finderQuery, cursor, conn, countResponses = '1')
       print("c_id: %s"%country_id)
       userExistQuery = ("""SELECT EXISTS(SELECT 1 FROM user WHERE user_hash = '%s' AND country_id = '%s')""")%(user,country_id)
       userExist = queries(userExistQuery, cursor, conn, countResponses = '1')
       userLoginExistsQuery = ("""SELECT EXISTS(SELECT 1 FROM userlogin WHERE user_hash = '%s')""")%user
       userLoginExists = queries(userLoginExistsQuery, cursor, conn, countResponses = '1')
       getLastLoginDateQuery = ("""SELECT last_login FROM userlogin WHERE user_hash = '%s'""")%user
       print("userExists: %s"%userExist)
       if country_id is not None and userExist == '1':
           print("user exists!")
           if userLoginExists == '1':
               print("userlogintable entry exists")
               today = datetime.datetime.today()
               getLastLoginDate = queries(getLastLoginDateQuery, cursor, conn, countResponses = '1')
               getLastLoginDate = datetime.datetime.strptime(getLastLoginDate, '%Y-%m-%d')
               #print(today)
               #print(getLastLoginDate)
               dateDiff = today - getLastLoginDate
               #print(today - getLastLoginDate)
               if dateDiff > datetime.timedelta(days=1):
                   updateUserLoginQuery = """UPDATE userlogin SET today_login = '1',last_login = '%s' WHERE user_hash = '%s'"""%(today.date(), user)
                   queries(updateUserLoginQuery, cursor, conn, readOrWrite = 'w')
                   increaseUserTokensQuery = """UPDATE user SET token = token + 1 WHERE user_hash = '%s'"""%(user)
                   queries(increaseUserTokensQuery, cursor, conn, readOrWrite = 'w')
               else:
                   todaysTokenQuery = """SELECT today_login FROM userlogin WHERE user_hash = '%s'"""%user
                   todaysToken = int(queries(todaysTokenQuery, cursor, conn, countResponses = '1'))
                   if todaysToken < 3:
                       increaseDayTokenQuery = """UPDATE userlogin SET today_login = today_login + 1 WHERE user_hash = '%s'"""%(user)
                       queries(increaseDayTokenQuery, cursor, conn, readOrWrite = 'w')
                       increaseUserTokensQuery = """UPDATE user SET token = token + 1 WHERE user_hash = '%s'"""%(user)
                       queries(increaseUserTokensQuery, cursor, conn, readOrWrite = 'w')
               #print("Date: %d and DBDate: %d")%(today, getLastLoginDate)
           else:
               print("userlogintable entry does not exist")
               today = datetime.datetime.today()
               insertQuery = """INSERT INTO userlogin(last_login, today_login, user_hash) VALUES('%s', 1, '%s')"""%(today.date(), user)
               queries(insertQuery, cursor, conn, readOrWrite = 'w')
           self.write_message(json.dumps({"response":"success", "type":"login"}).encode('utf-8'))       
       elif country_id is not None and userExist == '0':
           print("user does not exist or does not exist in this country! --> user created")
           newUserQuery = ("""INSERT INTO user(user_hash, country_id, token) VALUES('%s', '%s', 1)"""%(user, country_id))
           today = datetime.datetime.today()
           insertQuery = """INSERT INTO userlogin(last_login, today_login, user_hash) VALUES('%s', 1, '%s)"""%(today.date(), user)
           print(newUserQuery)
           try:
               newUser = queries(newUserQuery, cursor, conn, readOrWrite = 'w')
               print("newUser: %s"%newUser)
               queries(insertQuery, cursor, conn, readOrWrite = 'w')
               self.write_message(json.dumps({"response":"success", "type":"login"}).encode('utf-8'))
           except:
               print("Failure while creating User")
               self.write_message(json.dumps({"response":"failure", "type":"login"}).encode('utf-8'))
       else:
           print("Data for login is missing/or wrong codes")
           self.write_message(json.dumps({"response":"failure", "type":"login"}).encode('utf-8'))
   except Exception:
          print("Error at request for set a new event! Please look for the problem!!!")
          pass

  # --- Leaderboardabfrage ---
  elif request['get'] == "leaderboard":
   try:
       getMedalsGoldQuery = ("""select value,COUNT(value) AS TotalMedals, country_id from medals WHERE value = 1 GROUP BY value, country_id ORDER BY value, COUNT(value) DESC""")
       getMedalsGold = queries(getMedalsGoldQuery, cursor, conn)
       getMedalsSilverQuery = ("""select value,COUNT(value) AS TotalMedals, country_id from medals WHERE value = 2 GROUP BY value, country_id ORDER BY value, COUNT(value) DESC""")
       getMedalsSilver = queries(getMedalsSilverQuery, cursor, conn)
       getMedalsBronzeQuery = ("""select value,COUNT(value) AS TotalMedals, country_id from medals WHERE value = 3 GROUP BY value, country_id ORDER BY value, COUNT(value) DESC""")
       getMedalsBronze = queries(getMedalsBronzeQuery, cursor, conn)
       #counter = 0
       print(getMedalsGold)
       leaderboard = getMedalwinners(getMedalsGold, getMedalsSilver, getMedalsBronze)
       print(leaderboard)
       print(type(leaderboard))
       bubbleSort(leaderboard)
       print(leaderboard)
       data = ''
       for i in leaderboard:
           print(i)
           data = data + i
           data = data + (",")
       response = ''.join(data)[:-1]
       response = '{"response":"success", "type":"bets", "data":[%s]}'%response
       self.write_message(response) 
       print("Leaderboard")
   except Exception:
          print("Error at request for set a new event! Please look for the problem!!!")
          pass

  # --- Tokenabfrage ---
  elif request['get'] == "tokens":
   try:
       user = request['user_hash']
       userTokensQuery = """SELECT token FROM user WHERE user_hash = '%s'"""%user
       userTokens = queries(userTokensQuery, cursor, conn)
       data = '{"response":"success", "type":"tokens", "data":[{"tokens":"%s"}]}'%userTokens[0]
       self.write_message(data)
   except Exception:
          print("Error at request for set a new event! Please look for the problem!!!")
          pass

  # --- Events ---
  elif request['get'] == "events":
   try:
       eventsInQuery = """SELECT * FROM event"""
       events = queries(eventsInQuery, cursor, conn)
       data = []
       for line in events:
           data.append('{"event_id":"%s", "eventName":"%s", "date":"%s"},'%(line[0], line[1], line[2]))
       data = ''.join(data)[:-1]
       data = '{"response":"success", "type":"events", "data":[%s]}'%data
       print(data)
       self.write_message(data)
       print("die events")
   except Exception:
          print("Error at request for set a new event! Please look for the problem!!!")
          pass

  # --- Voucher get---
  elif request['get'] == "vouchers":
   try:
       user = request['user_hash']
       userVoucherQuery = """SELECT u1.v_id, u2.value FROM uservoucher AS u1 INNER JOIN voucher AS u2 ON u1.v_id=u2.v_id WHERE user_hash = "%s";"""%user
       userVoucher = queries(userVoucherQuery, cursor, conn)
       data = []
       for line in userVoucher:
           data.append('{"voucher_id":"%s", "voucherValue":"%s"},'%(line[0], line[1]))
       data = ''.join(data)[:-1]
       data = '{"response":"success", "type":"voucher", "data":[%s]}'%data
       print(data)
       self.write_message(data)
   except Exception:
          print("Error at request for set a new event! Please look for the problem!!!")
          pass
  # --- Voucher create---
  elif request['get'] == "vouchers_create":
   try:
       user = request['user_hash']
       for line in request['data']:
        print("erhaltener Voucher: %s"%line['Voucher_id'])
        tokenCostQuery = """SELECT cost FROM voucher WHERE v_id = '%s'"""%line['Voucher_id']
        tokenCost = queries(tokenCostQuery, cursor, conn)
        userTokenQuery = """SELECT token FROM user WHERE user_hash = '%s'"""%user
        userToken = queries(userTokenQuery, cursor, conn)
        #print(tokenCost[0][0])
        #print(userToken[0][0])
        #print(userToken[0][0] >= tokenCost[0][0])
        if userToken[0][0] >= tokenCost[0][0]:
            createUserVoucherQuery = """INSERT INTO uservoucher(user_hash, v_id) VALUES("%s", "%s")"""%(user, line['Voucher_id'])
            decreaseUserTokenQuery = """UPDATE user SET token = '%s' WHERE user_hash = '%s'"""%(userToken[0][0]-tokenCost[0][0], user)
            try:
                queries(createUserVoucherQuery, cursor, conn, readOrWrite = 'w')
                queries(decreaseUserTokenQuery, cursor, conn, readOrWrite = 'w')
                userVoucherQuery = """SELECT u1.v_id, u2.value FROM uservoucher AS u1 INNER JOIN voucher AS u2 ON u1.v_id=u2.v_id WHERE user_hash = "%s";"""%user
                print(userVoucherQuery)
                userVoucher = queries(userVoucherQuery, cursor, conn)
                data = []
                data = '{"response":"success", "type":"voucher_create", "data":""}'
                self.write_message(data)
            except:
                self.write_message(json.dumps({"response":"failure","type":"vouchers_create", "data":""}).encode('utf-8'))
        else:
            print("NOT enough tokens")
            self.write_message(json.dumps({"response":"failure","type":"vouchers_create", "data":""}).encode('utf-8'))
   except Exception:
          print("Error at request for set a new event! Please look for the problem!!!")
          pass
  elif request['get'] == "set_event_by_admin":
      try:
          admin = request['adminname']
          if admin == 'admin' and request['password'] == 'rappeward':
              eventname = request['eventname']
              date = datetime.datetime.strptime( request['date_of_event'], "%Y-%m-%d %H:%M:%S")
              insertEventQuery = """INSERT INTO event(name, date) VALUES('%s', '%s')"""%(eventname, date)
              insertEvent = queries(insertEventQuery, cursor, conn, readOrWrite = 'w')
              self.write_message(json.dumps({"response":"success","type":"vouchers_create", "data":""}).encode('utf-8'))
          else:
              self.write_message(json.dumps({"response":"failure","type":"vouchers_create", "data":""}).encode('utf-8'))
      except Exception:
          print("Error at request for set a new event! Please look for the problem!!!")
          pass
 def on_close(self):
  print ("Verbindung geschlossen")
  myDbConnect.close(conn)
 
application = tornado.web.Application([(r'/ws', WebsocketHandler),])

def queries(command, cursor, conn, readOrWrite = 'r', countResponses = '2'):
    try:
        if readOrWrite == 'r':
            print("read successful")
            cursor.execute(command)
            if countResponses == '1':
                entry = str(cursor.fetchone()[0])
                print("Entry: %s" %entry)
            elif countResponses == '2':
                entry = cursor.fetchall()
            return entry
        elif readOrWrite == 'w':
            cursor.execute(command)
            print("success")
            conn.commit()
    except:
        print("FEHLER")
        print(command)
        conn.rollback()

def getMedalwinners(getMedalsGold, getMedalsSilver, getMedalsBronze):
   leaderboard = []
   for i in getMedalsGold:
       country_id = i[2]
       gold = i[1]
       silver = 0
       bronze = 0
       #getMedalsGold.remove(i)
       for x in getMedalsSilver:
           if country_id == x[2]:
               silver = x[1]
               getMedalsSilver.remove(x)
       for x in getMedalsBronze:
           if country_id == x[2]:
               bronze = x[1]
               getMedalsBronze.remove(x)
       leaderboard.append('{"country":"%s", "gold":"%s", "silver":"%s", "bronze":"%s"}'%(country_id, gold, silver, bronze))
   for i in getMedalsSilver:
       country_id = i[2]
       silver = i[1]
       bronze = 0
       #getMedalsSilver.remove(i)
       for x in getMedalsBronze:
           if country_id == x[2]:
               bronze = x[1]
               getMedalsBronze.remove(x)
       leaderboard.append('{"country":"%s", "gold":"0", "silver":"%s", "bronze":"%s"}'%(country_id, silver, bronze))
   for i in getMedalsBronze:
       country_id = i[2]
       bronze = i[1]
       #getMedalsBronze.remove(i)
       leaderboard.append('{"country":"%s", "gold":"0", "silver":"0", "bronze":"%s"}'%(country_id, bronze))
   return leaderboard

def bubbleSort(medalList):
    for element in range(len(medalList)-1,0,-1):
        for i in range(element):
            if eval(medalList[i])["gold"]<eval(medalList[i+1])["gold"]:
                temp = medalList[i]
                medalList[i] = medalList[i+1]
                medalList[i+1] = temp
            elif eval(medalList[i])["gold"] == eval(medalList[i+1])["gold"]:
                if eval(medalList[i])["silver"]<eval(medalList[i+1])["silver"]:
                   temp = medalList[i]
                   medalList[i] = medalList[i+1]
                   medalList[i+1] = temp
                elif eval(medalList[i])["silver"] == eval(medalList[i+1])["silver"]:
                   if eval(medalList[i])["bronze"]<eval(medalList[i+1])["bronze"]:
                      temp = medalList[i]
                      medalList[i] = medalList[i+1]
                      medalList[i+1] = temp


if __name__ == "__main__":
 http_server = tornado.httpserver.HTTPServer(application)
 http_server.listen(9999)
 tornado.ioloop.IOLoop.instance().start()
 
