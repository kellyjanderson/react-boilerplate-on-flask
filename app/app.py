from flask import Flask, render_template
from flask_restful import Resource, Api
import os

app = Flask(__name__)
api = Api(app)

app.config.from_object('config.default')
if os.environ.get('APP_CONFIG_FILE'):
    app.config.from_envvar('APP_CONFIG_FILE')

class Hello(Resource):
    def get(self):
        return {'message': u'Hello React World!'}

api.add_resource(Hello, '/hello');

@app.route('/')
def root(name=None):
    return render_template('app.html', 
        data={'script':app.config['JAVASCRIPT_BUILD_FILE']})

if __name__ == '__main__':
    app.run()
