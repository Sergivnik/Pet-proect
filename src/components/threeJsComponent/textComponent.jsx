import React, { useEffect, useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Center, Text3D } from "@react-three/drei";
import Roboto from "./Roboto_Regular.json";
import { Clock } from "three";

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

  return (
    <Center position={position}>
      <Text3D
        font={Roboto}
        size={1.5}
        height={0.5}
        bevelThickness={10}
        castShadow={true}
        letterSpacing={-0.15}
      >
        {props.text}
        <meshNormalMaterial color={0xff0000} />
      </Text3D>
    </Center>
  );
};
