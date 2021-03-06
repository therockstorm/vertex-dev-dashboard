import { Environment } from "@vertexvis/viewer/dist/types/config/environment";
import { VertexSceneTree } from "@vertexvis/viewer-react";
import React from "react";

interface Props {
  readonly configEnv: Environment;
  readonly viewerId: string;
}

export function SceneTree({ configEnv, viewerId }: Props): JSX.Element {
  const ref = React.useRef<HTMLVertexSceneTreeElement>(null);

  React.useEffect(() => {
    const effectRef = ref.current;
    effectRef?.addEventListener("click", clickRow);
    return () => effectRef?.removeEventListener("click", clickRow);
  }, [ref]);

  const clickRow = async (event: MouseEvent | PointerEvent): Promise<void> => {
    const row = await ref?.current?.getRowForEvent(event);
    if (row?.node == null) return;

    console.debug(
      `Selected ${row.node.suppliedId?.value ?? row.node.id?.hex},${
        row.node.name
      }`
    );
  };

  return (
    <VertexSceneTree
      configEnv={configEnv}
      ref={ref}
      viewerSelector={`#${viewerId}`}
    />
  );
}
