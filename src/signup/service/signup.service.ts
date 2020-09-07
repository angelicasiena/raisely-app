import axios from "axios";
import { SignupMessage } from "../../types/index";

type SignupFormParams = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

const CAMPAIGNUUID = "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a";
const status = {
  ACTIVE_STATUS: "active",
  SUCCESS_STATUS: "success",
  ERROR_STATUS: "error",
};

class SignupService {
  public submit(data: SignupFormParams): Promise<SignupMessage> {
    return axios
      .post(`https://api.raisely.com/v3/signup`, {
        campaignUuid: CAMPAIGNUUID,
        data,
      })
      .then(function (response) {
        return {
          message: response.data.message,
          status:
            response.data.data.status.toLowerCase() === status.ACTIVE_STATUS
              ? status.SUCCESS_STATUS
              : status.ERROR_STATUS,
        } as SignupMessage;
      })
      .catch(function (error) {
        return {
          message: error?.response?.data?.errors[0]?.message,
          status: status.ERROR_STATUS,
        } as SignupMessage;
      });
  }

  public async emailChecker(email: string) {
    try {
      const emailChecker = await axios.post(
        `https://api.raisely.com/v3/check-user`,
        {
          campaignUuid: CAMPAIGNUUID,
          data: { email },
        }
      );

      return emailChecker.data.data.status;
    } catch (error) {
      console.error(error);
      return {
        message: "Error signing up... TRY AGAIN LATER...",
        status: status.ERROR_STATUS,
      };
    }
  }
}

export const signupService = new SignupService();
