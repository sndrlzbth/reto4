import re
from colorama import Fore
import requests

# Variables
website = "https://vulnhub.com/"
resultado = requests.get(website)
content = resultado.text

# Expresion regular
patron = r"/entry/[\w-]*"
# Buscar todas las coincidencias
maquinas_repetidas = re.findall(patron, str(content))

# Eliminar los duplicados
maquinas = list(set(maquinas_repetidas))

# Eliminar diagonales y entry
maquinas_final = []

for i in maquinas:
    nombre = i.replace("/entry/", "")
    maquinas_final.append(nombre)

# Imprimir
for i in maquinas_final:
    print(Fore.BLUE + i)


# Ver si hay datos nuevos en la pagina web

maquina_noob = "noob-1"
existe_noob = False

for i in maquinas_final:
    if i == maquina_noob:
        existe_noob = True
        break

if existe_noob == True:
    print(Fore.RED + "No hay datos nuevos")
else:
    print(Fore.GREEN + "Hay datos nuevos")