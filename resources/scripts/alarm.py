import smtplib
from email.MIMEMultipart import MIMEMultipart
from email.MIMEText import MIMEText
from email.MIMEBase import MIMEBase
from email.mime.image import MIMEImage
import os
from email import Encoders
import time
import datetime
import RPi.GPIO as GPIO
import picamera
import urllib
import urllib2
import sys


def mail(message, f=None,f2=None):
  a = datetime.datetime.now()
  a = str(a)
  a = a[0:19]
  msg = MIMEMultipart()
  msg['From'] = 'nicolas.andre54@gmail.com'
  msg['To'] = 'nicolas.andre54@gmail.com'
  msg['Subject'] = 'Alerte intrusion : '+str(a)
  #fichier joint image
  msg.attach(MIMEImage(file(f).read()))
  # #fichier joint video
  part = MIMEBase('application', 'octet-stream')
  part.set_payload(open(f2).read())
  Encoders.encode_base64(part)
  part.add_header('Content-Disposition','attachment; filename="%s"' % os.path.basename(f2))
  msg.attach(part)
  msg.attach(MIMEText(message))

  mailserver = smtplib.SMTP('smtp.gmail.com',587)
  mailserver.ehlo()
  mailserver.starttls()
  mailserver.ehlo()
  mailserver.login(os.environ.get('ALARM_EMAIL_FROM'), os.environ.get('ALARM_EMAIL_PASSWORD'))
  mailserver.sendmail(os.environ.get('ALARM_EMAIL_FROM_ALIAS'),os.environ.get('ALARM_EMAIL_TO'),msg.as_string())
  mailserver.quit()

GPIO.setmode(GPIO.BOARD)

pir = 7

GPIO.setup(pir, GPIO.IN)

def main():
  camera = picamera.PiCamera()
  while True:
    if GPIO.input(pir):
      a = datetime.datetime.now()
      a = str(a)
      a = a[0:19]
      alert = ("Alarm at "+str(a))
      print(alert)
      
      pic = (a)+(".jpg")
      vid = (a)+(".h264")
      message = (alert),(pic),(vid)
      camera.resolution = (1024,768)
      camera.capture(pic)
      time.sleep(2)
      camera.resolution = (640, 480)
      camera.start_recording(vid)
      camera.wait_recording(10)
      camera.stop_recording()

      mail(alert,pic,vid)
      time.sleep(10) #    time.sleep(30)
  return 0


main()
