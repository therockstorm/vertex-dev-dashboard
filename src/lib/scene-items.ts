import { vertexvis } from "@vertexvis/frame-streaming-protos";
import { ColorMaterial, Components } from "@vertexvis/viewer";

const SelectColor = {
  ...ColorMaterial.create(255, 255, 0),
  glossiness: 4,
  specular: { r: 255, g: 255, b: 255, a: 0 },
};

interface Req {
  readonly viewer: Components.VertexViewer | null;
}

interface SelectByHitReq extends Req {
  readonly hit?: vertexvis.protobuf.stream.IHit;
}

export async function selectByHit({
  hit,
  viewer,
}: SelectByHitReq): Promise<void> {
  if (viewer == null) return;

  const scene = await viewer.scene();
  if (scene == null) return;

  const id = hit?.itemId?.hex;
  console.debug(
    `${hit?.itemSuppliedId?.value ?? hit?.itemId?.hex},${
      hit?.metadata?.partName
    }`
  );
  if (id) {
    await scene
      .items((op) => [
        op.where((q) => q.all()).deselect(),
        op.where((q) => q.withItemId(id)).select(SelectColor),
      ])
      .execute();
  } else {
    await scene.items((op) => op.where((q) => q.all()).deselect()).execute();
  }
}
