import time

nombre = input("Ingresa tu nombre: ")
print ("Hola, " +nombre+ " bienvenid@ al juego del ahorcado")
print (" ")

time.sleep(1)
print ("Adivina la palabra")
time.sleep(0.5)
palabra="fullstack"
tupalabra=""
vidas=5

while (vidas>0):
    fallas=0
    for letra in palabra:
        if letra in tupalabra:
            print(letra, end="")
        else:
            print("_", end="")
            fallas=fallas+1
    if fallas == 0:
        print("")
        print ("Felicidades, has adivinado la palabra")
        break
    tuletra=input("\nIngresa una letra: ")
    tupalabra=tupalabra+tuletra
    if tuletra not in palabra:
        vidas=vidas-1
        print ("Te quedan ", vidas, " vidas")
        if vidas == 0:
            print ("Perdiste")
else:
    print ("Gracias por jugar :)")