extends Spatial

var life = 100
var figthing = false
var map_position
var damage = 50;


func _ready():
	add_to_group("Enemies")

func _process(_delta):
	if figthing:
		if $Timer.is_stopped():
			$Timer.start()

func _on_Area_body_entered(body):
	body.get_parent().add_to_group("figthers_" + str(self))
	self.figthing = true

func _on_Timer_timeout():
	var figthers = get_tree().get_nodes_in_group("figthers_" + str(self))
	for figther in figthers:
		life -= figther.damage
	if figthers:
		figthers[0].life -= damage
		if figthers[0].life <= 0:
			figthers[0].queue_free()
	if life <= 0:
		queue_free()
