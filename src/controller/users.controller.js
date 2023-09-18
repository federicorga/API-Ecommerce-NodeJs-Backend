import * as usersService from '../services/user.service.js'
import transport from "../utils/mailer.js";

import moment from "moment";

const getAllUsers = async (req, res) => {
  try {
    const result = await usersService.getAllUsers();
    return res.send({ status: 'success', result: result })
  } catch (error) {
    req.logger.error(error.message);
    res.status(500).send({ status: 'error', message: error.message });
  }
}


const deleteUsers = async (req, res) => {
  let date = moment();
  let users_result = await usersService.getAllUsers();
  if (users_result?.error)
    return res
      .status(500)
      .send({ status: "error", payload: users_result.error });
  users_result.forEach(async (user) => {
    let diff = 'last_connection' in user ? date.diff(moment(user.last_connection), "days") : null;
    if (diff > 2 || diff === null) {
      let user_delete
      if (user.email !== "coder@gmail.com") {
        user_delete = await usersService.deleteInactiveUser(user._id);
        if (user_delete?.error)
          return res
            .status(500)
            .send({ status: "error", payload: users_result.error });
        else {
          await transport.sendMail({
            from: "Federico G <micorre@gmail.com>",
            to: user.email,
            subject: "Su cuenta fue eliminada por inactividad",
            html: `<div>
                <p><strong>${user.first_name} ${user.last_name}</strong> tu cuenta fue eliminada ya que no hubo actividad por mas de 2 dias.</p>
              </div>`,
          });
        }
      }
      else {
        user_delete = 'No se puede eliminar al admin coder@gmail.com'
      }

    }
  });
  res.send({ status: "success", payload: "All of the innactive users were deleted" });
};



export {
  getAllUsers,
  deleteUsers
}