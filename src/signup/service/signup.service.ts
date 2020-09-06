import axios from "axios";

type SignupFormParams = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};
const CAMPAIGNUUID = "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a";

class SignupService {
  public submit(data: SignupFormParams): Promise<string> {
    return axios
      .post(`https://api.raisely.com/v3/signup`, {
        campaignUuid: CAMPAIGNUUID,
        data,
      })
      .then(function (response) {
        return response.data.status;
      })
      .catch(function (error) {
        console.error(error);
        return "TRY AGAIN LATER...";
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
