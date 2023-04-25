import { Joke, JokeModel } from "@/models/jokes.model";
import { addJoke, getJoke, selectJoke, updateJoke } from "@/store/generalSlice";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import Input from "@/components/Input/Input";

const JokView = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const joke: Joke | undefined = useSelector(selectJoke);

  const schema = yup
    .object({
      Title: yup.string().required(),
      Body: yup.string().required(),
      Author: yup.string().required(),
      Views: yup.number().required(),
    })
    .required();

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSuccess = () => {
    router.push("/");
  };

  const handleSubmitForm = async (data: any) => {
    const payload: JokeModel = data;
    if (joke && !!id?.length) {
      dispatch(
        updateJoke(
          { ...payload, CreatedAt: joke.CreatedAt, id: String(id) },
          onSuccess
        )
      );
    } else {
      dispatch(
        addJoke(
          {
            ...payload,
            CreatedAt: new Date().toISOString(),
          },
          onSuccess
        )
      );
    }
  };

  useEffect(() => {
    fetchJoke();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (joke?.id && !!id?.length) {
      reset({
        Title: joke?.Title,
        Body: joke?.Body,
        Author: joke?.Author,
        Views: joke?.Views,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [joke?.id]);

  const fetchJoke = () => {
    if (!!id?.length) {
      dispatch(getJoke(Number(id)));
    }
  };
  return (
    <div className="p-6 rounded overflow-hidden shadow-lg dark:bg-gray-700">
      <div className="flex flex-col">
        <form
          action="#"
          method="POST"
          onSubmit={handleSubmit(handleSubmitForm)}
        >
          <div className="text-xl font font-semibold my-4">
            {!!id?.length ? "Edit Joke" : "Add New Joke"}
          </div>
          <div className="my-6">
            <Input
              label={"Title"}
              register={register}
              name={"Title"}
              errors={errors}
            />
          </div>
          <div className="my-6">
            <Input
              label={"Author"}
              register={register}
              name={"Author"}
              errors={errors}
            />
          </div>
          <div className="my-6">
            <Input
              label={"Body"}
              register={register}
              name={"Body"}
              errors={errors}
            />
          </div>
          <div className="my-6">
            <Input
              type={"number"}
              label={"Views"}
              register={register}
              name={"Views"}
              errors={errors}
            />
          </div>
          <div className="flex flex-row items-end gap-2">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
            <button
              onClick={() => {
                router.push("/");
              }}
              className="bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JokView;
