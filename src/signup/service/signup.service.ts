import axios from "axios";

type SignupFormParams = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

type SignupResponse = {
  message: string;
  status: string;
};

const CAMPAIGNUUID = "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a";

class SignupService {
  public submit(data: SignupFormParams): Promise<SignupResponse> {
    return axios
      .post(`https://api.raisely.com/v3/signup`, {
        campaignUuid: CAMPAIGNUUID,
        data,
      })
      .then(function (response) {
        return {
          message: response.data.message,
          status: response.data.data.status,
        } as SignupResponse;
      })
      .catch(function (error) {
        return {
          message: error?.response?.data?.errors[0]?.message,
          status: error?.response?.data?.errors[0]?.status,
        };
      });
  }

  public async emailAlreadyExists(email: string) {
    try {
      const emailChecker = await axios.post(
        `https://api.raisely.com/v3/check-user`,
        {
          campaignUuid: CAMPAIGNUUID,
          data: { email },
        }
      );

      return emailChecker;
    } catch (error) {
      console.error(error);
      return "TRY AGAIN LATER...";
    }
  }
}

export const signupService = new SignupService();
