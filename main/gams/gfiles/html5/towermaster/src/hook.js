import { getSwingBlockVelocity } from './utils';
import * as constant from './constant';

export type HookInstance = {
  x: number;
  y: number;
  angle: number;
  weightX: number;
  weightY: number;
  ready: boolean;
};

export const hookAction = (instance: HookInstance, engine, time: number) => {
  const ropeHeight = engine.getVariable(constant.ropeHeight);

  if (!instance.ready) {
    instance.x = engine.width / 2;
    instance.y = ropeHeight * -1.5;
    instance.ready = true;
  }

  engine.getTimeMovement(
    constant.hookUpMovement,
    [[instance.y, instance.y - ropeHeight]],
    (value) => {
      instance.y = value;
    },
    {
      after: () => {
        instance.y = ropeHeight * -1.5;
      },
    }
  );

  engine.getTimeMovement(
    constant.hookDownMovement,
    [[instance.y, instance.y + ropeHeight]],
    (value) => {
      instance.y = value;
    },
    {
      name: 'hook',
    }
  );

  const initialAngle = engine.getVariable(constant.initialAngle);
  if (typeof initialAngle !== 'number') {
    console.error('Invalid initialAngle value:', initialAngle);
    return;
  }

  instance.angle = initialAngle * getSwingBlockVelocity(engine, time);

  instance.weightX = instance.x + Math.sin(instance.angle) * ropeHeight;
  instance.weightY = instance.y + Math.cos(instance.angle) * ropeHeight;
};

export const hookPainter = (instance: HookInstance, engine) => {
  const { ctx } = engine;
  const ropeHeight = engine.getVariable(constant.ropeHeight);
  const ropeWidth = ropeHeight * 0.1;
  const hook = engine.getImg('hook');

  if (!hook) {
    console.error('Missing hook image');
    return;
  }

  ctx
