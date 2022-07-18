extends Spatial

var target
var pre_worker = preload("res://scenes/worker.tscn")
var pre_batalion = preload("res://scenes/batalion.tscn")
var clicked = false
var map_position

var options = {	
	"top": null,
	"right": null,
	"bottom": {
		"text":"S",
		"function": "new_soldier"
	},
	"left": null
}

func _ready():
	for key in options:
		var string = 'options/option_{position}'.format({"position":key})
		if options[key]:
			print(key)
			get_node(string).function = options[key].function
			var _connect_code = get_node(string).connect("option_click",self,"on_option_click")
			string += '/Viewport2/Node2D'
			get_node(string).text = options[key].text
		else:
			get_node(string).visible = false
			


func _process(_delta):
	if clicked:
		$options.visible = true
	else:
		$options.visible = false

func _on_Area_input_event(_camera, event, _click_position, _click_normal, _shape_idx):
	if Input.is_action_just_pressed("ui_click") || event is InputEventScreenTouch && !event.is_pressed():
		add_to_group("clicked")
		clicked = true
		$options.visible = true

func new_soldier():
	var initial_position = global_transform.origin
	initial_position.y = 0
	var target_position = get_parent().map[map_position.bottom[0]][map_position.bottom[1]]
	var batalion
	if !target_position.batalion:
		batalion = pre_batalion.instance()
		batalion.global_transform.origin = Vector3(target_position.x, 0, target_position.y)
		target_position.batalion = batalion
		batalion.map_position = target_position
		get_parent().add_child(batalion)
	else:
		batalion = target_position.batalion
	var worker = pre_worker.instance()
	worker.global_transform.origin = initial_position
	worker.scale = Vector3(.3,.3,.3)
	get_parent().add_child(worker)
	worker.add_to_group("batalion_" + str(batalion))
	batalion.set_soldiers_position(target_position)

func other_function():
	print(123)
	
func left_function():
	print('left')
	
func right_function():
	print('rigth')

func on_option_click(value):
	call(value)
