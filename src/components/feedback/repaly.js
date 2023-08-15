import React from 'react';
import _ from "lodash"

const Replay = ({replay}) => {

    if (_.isEmpty(replay)) {
        return null;
    }
    return (
        <div className={"flex gap-5 items-start my-5"}>
            <div className="avatar placeholder md:block hidden">
                <div className="bg-secondary-400 text-gray-50 rounded-full w-8 h-8">
                    <span className={"text-xs"}>{_.isEmpty(replay.user?.salutation) ? "UN" : replay.user?.salutation}</span>
                </div>
            </div>
            <div className={"border rounded w-full p-4"}>
                <div>
                    <div className={'flex gap-5 items-center'}>
                        <h4 className={"font-semibold"}>
                            {replay.user?.salutation} {replay.user?.first_name} {replay.user?.last_name}
                        </h4>
                        <span className={'text-gray-400 text-xs'}>{replay.created_at}</span>
                    </div>
                    <p className={"mt-2"}>
                        {replay.comments}
                    </p>
                </div>
            </div>

        </div>
    );
};

export default Replay;