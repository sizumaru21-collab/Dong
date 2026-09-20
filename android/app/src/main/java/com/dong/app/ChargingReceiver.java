package com.dong.app;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

public class ChargingReceiver
        extends BroadcastReceiver {

    @Override
    public void onReceive(
            Context context,
            Intent intent
    ) {

        if (
                Intent.ACTION_POWER_CONNECTED
                        .equals(intent.getAction())
        ) {

            Intent launchIntent =
                    new Intent(
                            context,
                            MainActivity.class
                    );

            launchIntent.addFlags(
                    Intent.FLAG_ACTIVITY_NEW_TASK |
                    Intent.FLAG_ACTIVITY_CLEAR_TOP |
                    Intent.FLAG_ACTIVITY_SINGLE_TOP
            );

            context.startActivity(
                    launchIntent
            );

        }

    }

}
