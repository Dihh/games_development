extends Node

var game_scene = preload("res://scenes/test-area.tscn")
var game

func _on_Button_button_up():
	game = game_scene.instance()
	game.connect("phase_pass", self, "on_pahse_pass")
	$Buttons.hide()
	get_parent().add_child(game)

func on_pahse_pass():
	game.queue_free()
	$Buttons.show()


func _on_Button2_button_up():
	get_tree().quit()
