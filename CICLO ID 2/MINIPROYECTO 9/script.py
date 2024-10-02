# Extraer los datos de ranking de películas a través de wen scraping
import requests

API_KEY = '44eee949'

def obtener_rating(pelicula):
    url = f"http://www.omdbapi.com/?t={pelicula}&apikey={API_KEY}"
    respuesta = requests.get(url)
    datos = respuesta.json()

    if datos['Response'] == 'True':
        title = datos.get('Title')
        rating = datos.get('imdbRating')
        return title, rating
    else:
        return None, None

def main():
    
    while True:
        pelicula = input("Ingrese el nombre de la película (o 'salir' para terminar): ")
        if pelicula.lower() == 'salir':
            print("Gracias por usar el servicio.")
            break

        titulo, rating = obtener_rating(pelicula)
        if titulo and rating:
            print(f"La película '{titulo}' tiene un rating de: {rating}")
        else:
            print("No se encontró información sobre esa película.")

if __name__ == "__main__":
    main()
