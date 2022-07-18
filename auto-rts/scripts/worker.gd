extends Spatial


var target: Array = []
var speed: int = 20
var damage: int = 10
var life: int = 50
	

func _process(delta):
	if target.size():
		if global_transform.origin.distance_to(Vector3(target[0].x, 0, target[0].y) ) < 1: 
			$AnimationPlayer.stop()
			return
		if !$AnimationPlayer.is_playing():
			$AnimationPlayer.play("Andando")
		var direction_to_target = (Vector3(target[0].x, 0, target[0].y) - global_transform.origin).normalized()
		direction_to_target.y = 0
		$Armature.look_at(Vector3(target[0].x, 0, target[0].y), Vector3.UP)
		$Armature.rotate_object_local(Vector3(0,1,0), 3.14)	
		$Armature.rotation.x = 0
		$Armature.rotation.z= 0
		translate(direction_to_target * delta * speed)
	else:
		$AnimationPlayer.stop()


