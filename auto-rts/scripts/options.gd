tool
extends Spatial

func _on_optons_area_input_event(_camera, event, _click_position, _click_normal, _shape_idx):
	if Input.is_action_just_pressed("ui_click") || event is InputEventScreenTouch && !event.is_pressed():
		get_parent().add_to_group("clicked")
		get_parent().clicked = true
		visible = true
