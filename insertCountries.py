
import myDbConnect




conn = myDbConnect.connecting()
cursor = conn.cursor()
 
with open('country_list.txt') as fp:
    for line in fp:
        print(line)
        country = line.split('(')[0]
        country = country.strip(' ')
        print(country)
        query = """INSERT INTO country(name) VALUES('%s')"""%country
        print(query)

        try:
            cursor.execute(query)
            conn.commit()
        except:
            conn.rollback()
            

myDbConnect.close(conn)

