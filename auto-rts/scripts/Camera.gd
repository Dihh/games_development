extends Camera


var swap_start_position
var swap_end_position
var speed = 50
var touch_on = false
var old_event
var direction

func _input(event):
	if event is InputEventScreenDrag:
		direction = event.speed.normalized()
	pass

func _process(delta):
	if Input.is_action_pressed("ui_left"):
		moveCamera(Vector3(-1,0,0) * delta )
	if Input.is_action_pressed("ui_right"):
		moveCamera(Vector3(1,0,0) * delta)	
	if Input.is_action_pressed("ui_up"):
		moveCamera(Vector3(0,1,0) * delta)	
	if Input.is_action_pressed("ui_down"):
		moveCamera(Vector3(0,-1,0) * delta)	
	if direction:
		moveCamera(Vector3(-direction.x, direction.y, 0).normalized() * 0.02)
		direction = null
	pass

func moveCamera(move_direction):
	translate(move_direction * speed)
	pass
