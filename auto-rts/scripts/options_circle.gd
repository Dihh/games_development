tool
extends Node2D

func _draw():
	var color = Color(0, 0, 0, .6)
	draw_circle(Vector2(150, 150), 100, color)
