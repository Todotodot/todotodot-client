/* eslint-disable consistent-return */
import { charactersAttackInfo } from "../constants/charactersInfo";

const characterInfos = (level) => {
  const {
    SLIME_ATTACK,
    SMALL_WIZARD_ATTACK,
    FIRE_WIZARD_ATTACK,
    EARTH_WIZARD_ATTACK,
    WATER_WIZARD_ATTACK,
  } = charactersAttackInfo;

  if (level >= 0 && level < 5) {
    return SLIME_ATTACK;
  }

  if (level >= 5 && level < 10) {
    return SMALL_WIZARD_ATTACK;
  }

  if (level >= 10 && level < 15) {
    return FIRE_WIZARD_ATTACK;
  }

  if (level >= 15 && level < 20) {
    return EARTH_WIZARD_ATTACK;
  }

  if (level === 20) {
    return WATER_WIZARD_ATTACK;
  }
};

export default characterInfos;
