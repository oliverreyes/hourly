from HourlyAPI import app

@app.route('/')
@app.route('/index')
def index():
    return "WAZZZZUUUUUP"
