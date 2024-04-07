import { user } from "../DB/index";

const create = async () => {
  try {
    const u = await user.create({
      first_name: "Anet",
      last_name: 123,
      email: "adoe0@comcast.net",
      password: "adoe0@comcast.net",
      gender: "Female",
      avatar: "https://robohash.org/sintessequaerat.png?size=50x50&set=set1",
      domain: "Sales",
      available: false,
    });
    console.log(u._id.toString());
  } catch (error) {
    console.log(error);
  }
};

create();
