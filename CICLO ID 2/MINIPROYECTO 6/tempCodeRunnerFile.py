from num2words import num2words

def num_to_words(num):
    try:
        return num2words(num, lang='es')
    except Exception as e:
        return str(e)
    
def main():
    while True:
        user_input = input("Ingresa un numero: \n ('salir' para terminar) ")
        if user_input.lower() == 'salir':
            break
        try:
            number = int(user_input)
            print(num_to_words(number))
        except ValueError:
            print("Ingresa un numero valido")
if __name__ == "__main__":
    main()