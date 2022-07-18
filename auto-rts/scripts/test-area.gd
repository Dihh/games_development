extends Node

var worker: Resource = preload("res://scenes/worker.tscn")
var pre_floor: Resource = preload("res://scenes/floor.tscn")

var builds = {
	"pre_castle": preload("res://scenes/Castle.tscn"),
	"pre_mine": preload("res://scenes/Mine.tscn"),
	"pre_quarter": preload("res://scenes/quarter.tscn"),
	"pre_enemy": preload("res://scenes/Enemy.tscn")
}

var map_width: int = 6
var map_heigth: int = 6

var workers: Array = []
signal phase_pass

var map: Array = []

func _ready():
	for i in range(map_width):
		map.append([])
		for j in range(map_heigth):
			map[i].append({
				"x":i*20, 
				"y":j*20, 
				"top":null,
				"bottom":null,
				"left":null,
				"right":null,
				"build": null,
				"enemies": null,
				"batalion": null
			})
			if j > 0: map[i][j].top = [i, j - 1]
			if j < map_heigth - 1: map[i][j].bottom = [i, j + 1] 
			if i > 0: map[i][j].left = [i - 1, j] 
			if i < map_width - 1: map[i][j].right = [ i + 1, j]
			var out_center = i < float(map_width)/2 - 2 || j < float(map_heigth) / 2 - 2 || i >= float(map_width)/2 + 2 || j >= float(map_heigth) / 2 + 2
			if out_center:
				map[i][j].enemies = ['enemy']
	
	map[map_width/2.0 - 1][map_heigth/2.0 - 1].build = "castle"
	map[map_width/2.0 - 1][map_heigth/2.0 ].build = "mine"
	map[map_width/2.0][map_heigth/2.0 - 1].build = "quarter"
	
	
	for map_line in map:
		for map_element in map_line:
			set_floor(map_element.x, map_element.y)
			draw_item(map_element)
			draw_enemies(map_element)
	
func draw_item(map_element):
	if map_element.build:
		var element = builds["pre_" + map_element.build] .instance()
		element.global_transform.origin = Vector3(map_element.x,0,map_element.y)
		element.scale = Vector3(2,3,2)
		element.map_position = map_element
		add_child(element)

func draw_enemies(map_element):
	if map_element.enemies:
		for enemie in map_element.enemies:
			var element = builds["pre_" + enemie].instance()
			element.add_to_group("layer_" +str(map_element.x) + str(map_element.y))
			element.global_transform.origin = Vector3(map_element.x,0,map_element.y)
			element.scale = Vector3(2,3,2)
			element.map_position = map_element
			add_child(element)

func set_floor(x, y):
	var floor_el = pre_floor.instance()
	floor_el.scale = Vector3(10,1,10)
	floor_el.global_transform.origin  = Vector3(x,0,y)
	if (x % 40 == 0 && y % 40 == 0) ||(x % 40 == 20 && y % 40 == 20):
		floor_el.find_node("dark").visible = true
	else:
		floor_el.find_node("light").visible = true
	floor_el.visible = true
	add_child(floor_el)

func _process(_delta):
	$Node2D/Label.text = "FPS: " + str(Performance.get_monitor(Performance.TIME_FPS))

func _input(event):
	if Input.is_action_just_pressed("ui_click") || event is InputEventScreenTouch && !event.is_pressed():
		for node in get_tree().get_nodes_in_group("clicked"):
			node.clicked = false

func _on_Timer_timeout():
	if !get_tree().get_nodes_in_group("Enemies").size():
		emit_signal("phase_pass")
