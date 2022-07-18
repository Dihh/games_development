extends "res://addons/gut/test.gd"

var pre_worker = preload("res://scenes/worker.tscn")

func test_temp():
	var worker = pre_worker.instance()
	assert_eq(worker.speed, 20)
	pass
