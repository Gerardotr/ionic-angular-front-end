export interface AnuncioResp {
    ok:       boolean;
    pagina:   number;
    anuncios: Anuncio[];
}

export interface Anuncio {
    imgs?:                     string[];
    piscina?:                  boolean;
    aireacondicionado?:        boolean;
    seguridadprivada?:         boolean;
    jardin?:                   boolean;
    _id?:                      string;
    nombre?:                   string;
    moneda?:                   string;
    precio?:                   number;
    descripcion?:              string;
    cantidadBanos?:            number;
    cantidadHabitaciones?:     number;
    cantidadEstacionamientos?: number;
    usuario?:                  Usuario;
    creado?:                   string;
    __v?:                      number;
}

export interface Usuario {
    _id?:    string;
    nombre?: string;
    email?:  string;
    password?:  string;
    __v?:    number;
}
