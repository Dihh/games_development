extends Spatial

var function = ""
signal option_click

func _on_Area_input_event(_camera, event, _click_position, _click_normal, _shape_idx):
	if Input.is_action_just_pressed("ui_click") || event is InputEventScreenTouch && !event.is_pressed():
		emit_signal("option_click",function)
