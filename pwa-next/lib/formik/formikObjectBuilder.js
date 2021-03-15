

export default function useFormikObjectBuilder(initialValuesModel,validationSchemaModel,onSubmit){
    
    return {
        initialValues: initialValuesModel,
        validationSchema: validationSchemaModel,
        validateOnMount: false,
        initialErrors: false,
        onSubmit: onSubmit
    }

}