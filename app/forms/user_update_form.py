from flask_wtf import FlaskForm
from wtforms import StringField




class UserUpdateForm(FlaskForm):
    profileImgUrl = StringField('profileImgUrl')
