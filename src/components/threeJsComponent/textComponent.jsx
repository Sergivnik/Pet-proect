import React, { useEffect, useState, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Center, Text3D } from "@react-three/drei";
import Roboto from "./Roboto_Regular.json";
import { Clock, TextureLoader } from "three";
import { DOMENNAME } from "../../middlewares/initialState";

export const Text3DComponent = (props) => {
  const [position, setPosition] = useState([0, 0, -30]);
  const clock = useRef(new Clock());

  useEffect(() => {
    clock.current.start();
    setPosition([0, 0, -30]);
  }, [props.text]);

  useFrame(() => {
    const deltaTime = clock.current.getDelta();
    let z = position[2] + 2 * deltaTime;
    setPosition([0, 0, z]);
  });
  const colorMap = useLoader(
    TextureLoader,
    `${DOMENNAME}/textures/WoodFloor051_2K_Color.png`
  );
  return (
    <Center position={position}>
      <Text3D
        font={Roboto}
        size={2}
        height={1.5}
        bevelThickness={10}
        castShadow={true}
        letterSpacing={-0.15}
        flatShading={true}
      >
        {props.text}
        <meshStandardMaterial
          map={colorMap}
          color={"white"}
          roughness={1}
          metalness={0}
        />
      </Text3D>
    </Center>
  );
};
