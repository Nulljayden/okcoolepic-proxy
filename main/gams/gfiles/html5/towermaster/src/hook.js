import { getSwingBlockVelocity } from './utils';
import * as constant from './constant';

// Define the type HookInstance with properties x, y, angle, weightX, weightY, and ready
export type HookInstance = {
  x: number;
  y: number;
  angle: number;
  weightX: number;
  weightY: number;
  ready: boolean;
};

// Export hookAction function that takes instance, engine, and time as arguments
export const hookAction = (instance: HookInstance, engine, time: number) => {
  // Get the value of ropeHeight variable from the engine
  const ropeHeight = engine.getVariable(constant.ropeHeight);

  // If the hook is not ready
  if (!instance.ready) {
    // Set the initial position of the hook
    instance.x = engine.width / 2;
    instance.y = ropeHeight * -1.5;
    instance.ready = true;
  }

  // Move the hook up by the distance of ropeHeight
  engine.getTimeMovement(
    constant.hookUpMovement, // Name of the movement
    [[instance.y, instance.y - ropeHeight]], // Start and end positions
    (value) => {
      instance.y = value; // Update the position of the hook
    },
    {
      after: () => {
        instance.y = ropeHeight * -1.5; // Reset the position of the hook after the movement
      },
    }
  );

  // Move the hook down by the distance of ropeHeight
  engine.getTimeMovement(
    constant.hookDownMovement, // Name of the movement
    [[instance.y, instance.y + ropeHeight]], // Start and end positions
    (value) => {
      instance.y = value; // Update the position of the hook
    },
    {
      name: 'hook', // Name of the object being moved
    }
  );

  // Get the value of initialAngle variable from the engine
  const initialAngle = engine.getVariable(constant.initialAngle);
  if (typeof initialAngle !== 'number') {
    console.error('Invalid initialAngle value:', initialAngle);
    return; // Return if the initialAngle is not a number
  }

  // Calculate the angle of the hook based on the initialAngle and the swing block velocity
  instance.angle = initialAngle * getSwingBlockVelocity(engine, time);

  // Calculate the position of the weight based on the angle and the ropeHeight
  instance.weightX = instance.x + Math.sin(instance.angle) * ropeHeight;
  instance.weightY = instance.y + Math.cos(instance.angle) * ropeHeight;
};

// Ex
