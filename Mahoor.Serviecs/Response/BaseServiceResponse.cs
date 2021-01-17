namespace Mahoor.Services.Response
{
    public class BaseServiceResponse<TResponse>
    {
//        public BaseServiceResponse(bool successFull,string message , string detailedMessage , TResponse reponse)
//        {
//            Message = message;
//            DetailedMessage = detailedMessage;
//            Response = reponse;
//            SuccessFullResponse = successFull;
//        }
//
//        public BaseServiceResponse(bool successFull, TResponse reponse)
//        {
//            Response = reponse;
//            SuccessFullResponse = successFull;
//
//        }

        public static BaseServiceResponse<TResponse> FailedResponse(string message)
        {
            return new BaseServiceResponse<TResponse>( )
            {
                SuccessFull = false,
                Message = message
            };
        }
        public static BaseServiceResponse<TResponse> SuccessFullResponse(TResponse response)
        {
            return new BaseServiceResponse<TResponse>()
            {
                SuccessFull = true,
                Response = response
            };
        }


        public bool SuccessFull { get; private set; }
        public string Message { get; private set; }
        public string DetailedMessage { get; private set; }

        public TResponse Response { get; private set; }
        
    }
}
