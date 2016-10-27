from flask import Flask, render_template
app = Flask(__name__)

app.config.from_object('config.default')
app.config.from_envvar('APP_CONFIG_FILE')

@app.route('/')
def root(name=None):
    return render_template('app.html', data=app.config['JAVASCRIPT_BUILD_FILE'])

if __name__ == '__main__':
    app.run()
