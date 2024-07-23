from flask import Flask, request, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/save', methods=['POST'])
def save_canvas():
    # Procesar la imagen del lienzo recibida desde JavaScript
    canvas_image = request.form['canvas_image']
    # Aquí puedes guardar la imagen o realizar cualquier otro procesamiento necesario
    return 'Canvas saved successfully!'

if __name__ == '__main__':
    app.run(debug=True)
