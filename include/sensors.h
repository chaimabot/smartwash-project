#ifndef SENSORS_H
#define SENSORS_H

class Sensors {
public:
    void begin();
    int readVibration();
    float readCurrent();
    String getTelemetry();  
};

#endif
