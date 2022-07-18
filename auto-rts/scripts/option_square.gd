tool
extends Node2D
var dynamic_font = DynamicFont.new()
var text = ""

func _ready():
	dynamic_font.font_data = load("res://fonts/HumanSans-Medium.otf")
	dynamic_font.size = 30

func _draw():
	draw_rect(Rect2(Vector2(115, 115),Vector2(70,70)), Color(0, 0, 0, .6))
	draw_string(dynamic_font,Vector2(135, 160),text, Color(1,1,1))
