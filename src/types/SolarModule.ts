interface SolarModuleDetailedInfo {
  quantity: number;
  price: number;
}

export interface SolarModule {
  priFlat: SolarModuleDetailedInfo;
  priFlatDuo: SolarModuleDetailedInfo;
  priFlatTrio: SolarModuleDetailedInfo;
  priRoof: SolarModuleDetailedInfo;
  priRoofDuo: SolarModuleDetailedInfo;
  priBalcony: SolarModuleDetailedInfo;
  priBasic: SolarModuleDetailedInfo;
  priWall: SolarModuleDetailedInfo;
  priWallDuo: SolarModuleDetailedInfo;
}
