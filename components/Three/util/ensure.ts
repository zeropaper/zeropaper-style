import * as THREE from "three";

// ------------------------------------------------------------
export function ensure<R extends THREE.Object3D = THREE.Object3D>(
  name: string,
  creator: (_THREE: typeof THREE) => R,
  object: THREE.Object3D,
  recreate = false): R {
  const found = object.getObjectByName(name) as R;
  if (found) {
    if (!recreate)
      return found;
    object.remove(found);
    if (object instanceof THREE.Mesh) {
      object.geometry.dispose();
      object.material.dispose();
    } else if (typeof (object as any).dispose === "function") {
      (object as any).dispose();
    }
  }

  const created = creator(THREE);
  created.name = name;
  object.add(created);
  return created;
}
