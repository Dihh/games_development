extends Spatial

var pre_worker = preload("res://scenes/worker.tscn")
# Declare member variables here. Examples:
# var a = 2
# var b = "text"
var positions = {
	"1": [
		{
			"x": 0,
			"y": 0
		}
	],
	"2": [
		{
			"x": -1,
			"y": 0
		},
		{
			"x": 1,
			"y": 0
		}
	],
	"3": [
		{
			"x": -2,
			"y": 0
		},
		{
			"x": 0,
			"y": 0
		},
		{
			"x": 2,
			"y": 0
		}
	],
	"4": [
		{
			"x": -2,
			"y": 0
		},
		{
			"x": 0,
			"y": 0
		},
		{
			"x": 2,
			"y": 0
		},
		{
			"x": 0,
			"y": -2
		}
	],
	"5": [
		{
			"x": -2,
			"y": 0
		},
		{
			"x": 0,
			"y": 0
		},
		{
			"x": 2,
			"y": 0
		},
		{
			"x": -1,
			"y": -2
		},
		{
			"x": 1,
			"y": -2
		}
	],
	"6": [
		{
			"x": -2,
			"y": 0
		},
		{
			"x": 0,
			"y": 0
		},
		{
			"x": 2,
			"y": 0
		},
		{
			"x": -2,
			"y": -2
		},
		{
			"x": 0,
			"y": -2
		},
		{
			"x": 2,
			"y": -2
		}
	],
	"7": [
		{
			"x": -2,
			"y": 0
		},
		{
			"x": 0,
			"y": 0
		},
		{
			"x": 2,
			"y": 0
		},
		{
			"x": -2,
			"y": -2
		},
		{
			"x": 0,
			"y": -2
		},
		{
			"x": 2,
			"y": -2
		},
		{
			"x": 0,
			"y": -4
		}
	],
	"8": [
		{
			"x": -2,
			"y": 0
		},
		{
			"x": 0,
			"y": 0
		},
		{
			"x": 2,
			"y": 0
		},
		{
			"x": -2,
			"y": -2
		},
		{
			"x": 0,
			"y": -2
		},
		{
			"x": 2,
			"y": -2
		},
		{
			"x": -1,
			"y": -4
		},
		{
			"x": 1,
			"y": -4
		}
	],
	"9": [
		{
			"x": -2,
			"y": 0
		},
		{
			"x": 0,
			"y": 0
		},
		{
			"x": 2,
			"y": 0
		},
		{
			"x": -2,
			"y": -2
		},
		{
			"x": 0,
			"y": -2
		},
		{
			"x": 2,
			"y": -2
		},
		{
			"x": -2,
			"y": -4
		},
		{
			"x": 0,
			"y": -4
		},
		{
			"x": 2,
			"y": -4
		}
	],
	"10": [
		{
			"x": -2,
			"y": 0
		},
		{
			"x": 0,
			"y": 0
		},
		{
			"x": 2,
			"y": 0
		},
		{
			"x": -2,
			"y": -2
		},
		{
			"x": 0,
			"y": -2
		},
		{
			"x": 2,
			"y": -2
		},
		{
			"x": -2,
			"y": -4
		},
		{
			"x": 0,
			"y": -4
		},
		{
			"x": 2,
			"y": -4
		},
		{
			"x": 0,
			"y": -6
		}
	]
}

var options = {	
	"top": {
		"text":"T",
		"function": "move_top"
	},
	"right": {
		"text":"R",
		"function": "move_right"
	},
	"bottom": {
		"text":"B",
		"function": "move_bottom"
	},
	"left": {
		"text":"R",
		"function": "move_left"
	}
}

var map_position
var clicked = false

func _ready():
	add_to_group("Batalions")
	for key in options:
		var string = 'options/option_{position}'.format({"position":key})
		if options[key]:
			get_node(string).function = options[key].function
			var _connect_code = get_node(string).connect("option_click",self,"on_option_click")
			string += '/Viewport2/Node2D'
			get_node(string).text = options[key].text
		else:
			get_node(string).visible = false
	pass

func set_soldiers_position(target_map_position):
	var soldiers = get_tree().get_nodes_in_group("batalion_" + str(self))
	for i in range(soldiers.size()):
		var initial_position = global_transform.origin
		initial_position.y = 0
		var targets_positions = [{"x": initial_position.x + positions[str(soldiers.size())][i].x , "y": initial_position.z + positions[str(soldiers.size())][i].y}]
		if target_map_position.enemies:
			targets_positions = []
			var targets = get_tree().get_nodes_in_group("layer_" +str(map_position.x) + str(map_position.y))
			for el in targets:
				var target_position = el.global_transform.origin
				target_position.y = 0
				targets_positions.append({"x": target_position.x, "y": target_position.z})
		soldiers[i].target = targets_positions
	pass

func _process(_delta):
	if get_tree().get_nodes_in_group("batalion_" + str(self)).size() <= 0: queue_free()
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
	pass # Replace with function body.

func on_option_click(value):
	call(value)

func move_right():
	print(map_position)
	if map_position.right:
		var target_position = get_parent().map[map_position.right[0]][map_position.right[1]]
		global_transform.origin = Vector3(target_position.x, 0, target_position.y) 
		map_position.batalion = null
		map_position = get_parent().map[map_position.right[0]][map_position.right[1]]
		map_position.batalion = self
		set_soldiers_position(map_position)

func move_left():
	print(map_position)
	if map_position.left:
		var target_position = get_parent().map[map_position.left[0]][map_position.left[1]]
		global_transform.origin = Vector3(target_position.x, 0, target_position.y) 
		map_position.batalion = null
		map_position = get_parent().map[map_position.left[0]][map_position.left[1]]
		map_position.batalion = self
		set_soldiers_position(map_position)

func move_bottom():
	print(map_position)
	if map_position.bottom:
		var target_position = get_parent().map[map_position.bottom[0]][map_position.bottom[1]]
		global_transform.origin = Vector3(target_position.x, 0, target_position.y) 
		map_position.batalion = null
		map_position = get_parent().map[map_position.bottom[0]][map_position.bottom[1]]
		map_position.batalion = self
		set_soldiers_position(map_position)

func move_top():
	print(map_position)
	if map_position.top:
		var target_position = get_parent().map[map_position.top[0]][map_position.top[1]]
		global_transform.origin = Vector3(target_position.x, 0, target_position.y) 
		map_position.batalion = null
		map_position = get_parent().map[map_position.top[0]][map_position.top[1]]
		map_position.batalion = self
		set_soldiers_position(map_position)
