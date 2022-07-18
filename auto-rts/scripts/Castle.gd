extends Spatial

var target
var worker = preload("res://scenes/worker.tscn")
var clicked = false
var map_position

var options = {	
	"top": {
		"text":"W",
		"function": "new_worker"
	},
	"right": null,
	"bottom": null,
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
	pass


func _on_Area_input_event(_camera, event, _click_position, _click_normal, _shape_idx):
	if Input.is_action_just_pressed("ui_click") || event is InputEventScreenTouch && !event.is_pressed():
		add_to_group("clicked")
		clicked = true
		$options.visible = true

func _on_Area_body_entered(body):
	body.get_parent().target = self.target


func new_worker():
	var workers = worker.instance()
	get_parent().add_child(workers)
	workers.target = get_parent().find_node("Mine")

func other_function():
	print(123)
	
func left_function():
	print('left')
	
func right_function():
	print('rigth')

func on_option_click(value):
	call(value)
