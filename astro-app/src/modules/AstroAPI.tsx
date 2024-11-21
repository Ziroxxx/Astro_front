export interface planetInfo {
    planetID: number,
    name: string,
    description: string,
    img: string,
    detDes: string,
    mockImg?: string
}

export interface planetResult {
    planets: planetInfo[],
    wishID: string,
    wishCount: number
}

export const getPlanetByName = async (name = ''): Promise<planetResult> =>{
    return fetch(`http://192.168.1.19:3000/api/planets?PlanetName=${name}`)
        .then((response) => response.json())
}

export const getPlanetById = async (
    id: number | string
  ): Promise<planetInfo> => {
    return fetch(`http://192.168.1.19:3000/api/planet/${id}`).then(
      (response) => response.json()
    );
  };

