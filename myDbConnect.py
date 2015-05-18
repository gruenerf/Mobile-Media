""" http://www.mysqltutorial.org/python-connecting-mysql-databases/ """

from mysql.connector import MySQLConnection, Error
from mysql_dbconfig import read_db_config

def connecting():
 db_config = read_db_config()
 success = False
 
 try:
  print('Connecting to database....')
  mysqlConn = MySQLConnection(**db_config)
   
  if mysqlConn.is_connected():
   print('connection estabslished.')
   success = True
  else:
   print('connection failed')
  return mysqlConn
 
 except Error as err:
  print(err)
  return 

def close(mysqlConn):
 if mysqlConn:
  mysqlConn.close()
  print('Connection closed')

if __name__ == "__main__":
    mC = connecting()
    close(mC)
