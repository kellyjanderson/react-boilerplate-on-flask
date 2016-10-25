from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def root(name=None):
    return render_template('app.html', name=name)

if __name__ == '__main__':
    app.run()
