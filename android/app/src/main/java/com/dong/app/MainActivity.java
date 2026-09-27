package com.dong.app;

import android.app.Activity;
import android.os.BatteryManager;
import android.os.Build;
import android.os.Bundle;
import android.view.Gravity;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.graphics.Color;
import android.graphics.Typeface;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.widget.LinearLayout;
import android.widget.TextView;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class MainActivity extends Activity {

    private TextView clockText;
    private TextView dateText;
    private TextView batteryText;
    private TextView chargingText;

    private final SimpleDateFormat clockFormat =
            new SimpleDateFormat("HH:mm", Locale.getDefault());

    private final SimpleDateFormat dateFormat =
            new SimpleDateFormat("EEE, MMM d", Locale.getDefault());


    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);

        makeFullscreen();

        getWindow().addFlags(
                WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON
        );

        buildScreen();

        updateClock();

        updateChargingState();
    }


    @Override
    protected void onResume() {

        super.onResume();

        updateChargingState();
    }


    private void makeFullscreen() {

        Window window = getWindow();

        window.setStatusBarColor(Color.BLACK);
        window.setNavigationBarColor(Color.BLACK);

        window.getDecorView().setSystemUiVisibility(

                View.SYSTEM_UI_FLAG_FULLSCREEN |

                View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY |

                View.SYSTEM_UI_FLAG_HIDE_NAVIGATION |

                View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN |

                View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION |

                View.SYSTEM_UI_FLAG_LAYOUT_STABLE
        );
    }


    private void buildScreen() {

        LinearLayout root =
                new LinearLayout(this);

        root.setOrientation(
                LinearLayout.VERTICAL
        );

        root.setBackgroundColor(
                Color.rgb(5, 5, 7)
        );

        root.setPadding(
                dp(24),
                dp(24),
                dp(24),
                dp(20)
        );


        /*
         * TOP ROW
         */

        LinearLayout top =
                new LinearLayout(this);

        top.setOrientation(
                LinearLayout.HORIZONTAL
        );

        top.setGravity(
                Gravity.CENTER_VERTICAL
        );


        chargingText =
                createText(
                        "ϟ  Checking",
                        14,
                        Color.rgb(175, 150, 220)
                );


        batteryText =
                createText(
                        "0%",
                        14,
                        Color.rgb(180, 180, 190)
                );


        top.addView(

                chargingText,

                new LinearLayout.LayoutParams(
                        0,
                        LinearLayout.LayoutParams.WRAP_CONTENT,
                        1
                )
        );


        top.addView(
                batteryText
        );


        root.addView(top);


        /*
         * CENTER
         */

        LinearLayout center =
                new LinearLayout(this);

        center.setOrientation(
                LinearLayout.VERTICAL
        );

        center.setGravity(
                Gravity.CENTER
        );


        clockText =
                createText(
                        "00:00",
                        90,
                        Color.WHITE
                );


        clockText.setTypeface(
                Typeface.create(
                        "sans",
                        Typeface.NORMAL
                )
        );


        dateText =
                createText(
                        "Sun, Jan 1",
                        16,
                        Color.rgb(100, 100, 110)
                );


        center.addView(
                clockText
        );


        center.addView(
                dateText
        );


        root.addView(

                center,

                new LinearLayout.LayoutParams(
                        LinearLayout.LayoutParams.MATCH_PARENT,
                        0,
                        1
                )
        );


        /*
         * BRAND
         */

        TextView brand =
                createText(
                        "dong",
                        11,
                        Color.rgb(35, 35, 42)
                );

        brand.setGravity(
                Gravity.CENTER
        );


        root.addView(

                brand,

                new LinearLayout.LayoutParams(
                        LinearLayout.LayoutParams.MATCH_PARENT,
                        dp(30)
                )
        );


        setContentView(root);
    }


    private TextView createText(
            String text,
            float size,
            int color
    ) {

        TextView view =
                new TextView(this);

        view.setText(text);

        view.setTextSize(size);

        view.setTextColor(color);

        view.setGravity(
                Gravity.CENTER_VERTICAL
        );

        view.setIncludeFontPadding(false);

        return view;
    }


    private void updateClock() {

        if (clockText == null) {
            return;
        }


        Date now =
                new Date();


        clockText.setText(
                clockFormat.format(now)
        );


        dateText.setText(
                dateFormat.format(now)
        );


        updateBattery();

        updateChargingState();


        clockText.postDelayed(

                new Runnable() {

                    @Override
                    public void run() {
                        updateClock();
                    }
                },

                1000
        );
    }


    private void updateBattery() {

        BatteryManager manager =
                (BatteryManager)
                        getSystemService(
                                BATTERY_SERVICE
                        );


        if (Build.VERSION.SDK_INT >=
                Build.VERSION_CODES.LOLLIPOP) {

            int level =
                    manager.getIntProperty(
                            BatteryManager.BATTERY_PROPERTY_CAPACITY
                    );


            if (level >= 0) {

                batteryText.setText(
                        level + "%"
                );
            }
        }
    }


    private void updateChargingState() {

        if (chargingText == null) {
            return;
        }


        boolean charging = false;


        /*
         * Android 6.0+
         */

        if (Build.VERSION.SDK_INT >=
                Build.VERSION_CODES.M) {

            BatteryManager manager =
                    (BatteryManager)
                            getSystemService(
                                    BATTERY_SERVICE
                            );

            charging =
                    manager.isCharging();
        }


        /*
         * Fallback for older Android versions
         */

        if (Build.VERSION.SDK_INT <
                Build.VERSION_CODES.M) {

            Intent batteryIntent =
                    registerReceiver(
                            null,
                            new IntentFilter(
                                    Intent.ACTION_BATTERY_CHANGED
                            )
                    );


            if (batteryIntent != null) {

                int status =
                        batteryIntent.getIntExtra(
                                BatteryManager.EXTRA_STATUS,
                                -1
                        );


                charging =
                        status ==
                                BatteryManager.BATTERY_STATUS_CHARGING
                                ||
                        status ==
                                BatteryManager.BATTERY_STATUS_FULL;
            }
        }


        if (charging) {

            chargingText.setText(
                    "ϟ  Charging"
            );

            chargingText.setTextColor(
                    Color.rgb(175, 150, 220)
            );

        } else {

            chargingText.setText(
                    "Not charging"
            );

            chargingText.setTextColor(
                    Color.rgb(110, 110, 120)
            );
        }
    }


    private int dp(int value) {

        return (int)
                (
                        value *
                        getResources()
                                .getDisplayMetrics()
                                .density
                );
    }
}
