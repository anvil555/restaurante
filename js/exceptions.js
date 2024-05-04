 
 /**
  * En cuanto a las excepciones he creado clases muy genéricas para intentar "reaprovechar"
  * el código en lo posible.
  */
 
 
 /**
  * Creamos una clase excepción base que hereda de error
  * en el constructor le pasamos los parámetros que queremos mostrar
  * hacemos la llamada al constructor de la clase padre.
  */
 class BaseException extends Error{
    constructor(message = '', fileName, lineNumber){
        super(message, fileName, lineNumber);
        this.message="";

    }
 }
 
 /**
  * Cuando un valor es nulo captura el error.
  */
 class NullObjectException extends BaseException{
     constructor(){
         super();
         this.name="NullObjectException";
         this.message="Falta un argumento en la función."
     }

 }
/**
 * Esta clase la he copiado de los apuntes pero no he sido capaz de forzar su aparicion
 */
class InvalidConstructorException extends BaseException {
    constructor() {
        super();
        this.name = "InvalidConstructorException";
        this.message = "Construccion de objeto invalido."
    }

}

/**
 * Cuando una función no devuelve nada capturamos la excepcion
 * realmente a lo mejor no es un error y simplemente habría que informar 
 * 
 */
class ValueEmptyException extends BaseException {
    constructor() {
        super();
        this.name = "ValueEmptyException";
        this.message = "Valor vacio."
    }
}

/**
 * Este error captura cuando pasamos por parámetro un valor que no espera la función
 * me sirve para todas las clases y muestra parámetros del objeto inesperado.
 */
class UnexpectedObjectException extends BaseException {
    constructor(value) {
        super();
        this.name = "UnexpectedObjectException";
        this.message = value + ": Objeto inesperado"
    }
}

/**
 * Devuelve una excepcion con el valor del parametro cuando no encuentra un elemento.
 * 
 */
class ItemNotFoundException extends BaseException {
    constructor(name) {
        super();
        this.name = "ItemNotFoundException";
        this.message = "Objeto " + name + " no encontrado"
    }
}

/**
 * Esta excepción es capturada cuando intentamos añadir un elemento a una colección
 * y este ya existe.
 */
class ObjectAlreadyExistsException extends BaseException {
    constructor(value) {
        super();
        this.name = "ObjectAlreadyExistsException";
        this.message = value + " ya existe en la coleccion.";
    }
}

/**
 * Excepción específica a modo de prueba para la clase Category.
 */
class CategoryNotExistException extends BaseException {
    constructor(value) {
        super();
        this.name = "CategoryNotExistException";
        this.message = "Categoria " + value + " no existe en la colección.";
    }
}

/**
 * TAREA 7
 * Excepción específica a modo de prueba para la clase Category.
 */
class AuthenticationServiceException extends BaseException {
    constructor(value) {
        super(message,filename,linenumber);
        this.name = "AuthenticationServiceException";
    }
}


/**
 * exportamos todas las clases de Excepciones menos la "padre".
 */
export {
    UnexpectedObjectException, ValueEmptyException,
    InvalidConstructorException, ItemNotFoundException,
    ObjectAlreadyExistsException,CategoryNotExistException,
    NullObjectException,AuthenticationServiceException
};