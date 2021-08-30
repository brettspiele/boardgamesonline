export type GameBoard = {
  ratingTrack: unknown;
  oceans: unknown;
  phaseTrackingTokens: unknown;
  oxygenTrack: unknown;
  temperatureTrack: unknown;
};

export type Cost = {};

export type Requirement = {};

export enum TAGS {}

export enum CARD_COLOR {
  BLUE = "ACTIVE",
  GREEN = "AUTOMATED",
  RED = "EVENT",
}

enum PHASES {}

export type Ability = {};

export interface ProjectCard {
  name: string;
  cost: Cost;
  requirement: Requirement;
  tags: TAGS[];
  color: CARD_COLOR;
  ability?: Ability;
  vp?: number;
  number: number;
}

export type Effect = {};

// Purple - Only on blue cards
export interface EffectCard extends ProjectCard {
  color: CARD_COLOR.BLUE;
  effect: Effect;
  activePhases: PHASES;
}

export type Production = {};

// Orange - only on green cards
export interface ProductionCard extends ProjectCard {
  color: CARD_COLOR.GREEN;
  production: Production;
  activePhases: PHASES;
}

export type Capability = {};

// Blue - only on blue cards
export interface CapabilityCard extends ProjectCard {
  color: CARD_COLOR.BLUE;
  capability: Capability;
  activePhases: PHASES;
}

export type OceanTile = {};

export type ForestToken = {};

export type PlayerBoard = {};

export type CorporationCard = {
  name: string;
  tags: TAGS[];
};

export type Resource = {};

export type PlayerCube = {};

export type TrackingCube = {};

export type PhaseCard = {};

export type PhaseTrackingToken = {};