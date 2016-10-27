from flask import Flask, render_template
import os

app = Flask(__name__)

app.config.from_object('config.default')
if os.environ.get('APP_CONFIG_FILE'):
    app.config.from_envvar('APP_CONFIG_FILE')

@app.route('/')
def root(name=None):
    return render_template('app.html', data=app.config['JAVASCRIPT_BUILD_FILE'])

if __name__ == '__main__':
    app.run()
