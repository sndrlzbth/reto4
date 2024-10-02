def mostrar_menu():
    print("\nBienvenido a nuestro servicio USSD")
    print("1. Consulta de saldo")
    print("2. Recarga de saldo")
    print("3. Paquete de datos")
    print("0. Salir")

def consulta_saldo():
    print("Su saldo actual es: $10.00")

def recarga_saldo():
    print("¿Cuánto desea recargar? (Ingrese el monto en dólares)")

def paquete_datos():
    print("Opciones de paquetes de datos:")
    print("1. Paquete de 1GB")
    print("2. Paquete de 5GB")
    print("3. Paquete de 10GB")

def main():
    while True:
        mostrar_menu()
        opcion = input("Seleccione una opción: ")

        if opcion == '1':
            consulta_saldo()
        elif opcion == '2':
            recarga_saldo()
        elif opcion == '3':
            paquete_datos()
        elif opcion == '0':
            print("Gracias por usar nuestro servicio.")
            break
        else:
            print("Opción no válida. Intente de nuevo.")
        
        # Esperar a que el usuario presione Enter para volver al menú
        input("\nPresione Enter para continuar...")

if __name__ == "__main__":
    main()