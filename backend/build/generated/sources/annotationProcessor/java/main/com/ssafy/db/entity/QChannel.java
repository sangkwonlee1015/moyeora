package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QChannel is a Querydsl query type for Channel
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QChannel extends EntityPathBase<Channel> {

    private static final long serialVersionUID = 185148161L;

    public static final QChannel channel = new QChannel("channel");

    public final StringPath channelDesc = createString("channelDesc");

    public final StringPath channelName = createString("channelName");

    public final StringPath channelPassword = createString("channelPassword");

    public final NumberPath<Long> channelSeq = createNumber("channelSeq", Long.class);

    public final StringPath channelTag = createString("channelTag");

    public final NumberPath<Long> userSeq = createNumber("userSeq", Long.class);

    public QChannel(String variable) {
        super(Channel.class, forVariable(variable));
    }

    public QChannel(Path<? extends Channel> path) {
        super(path.getType(), path.getMetadata());
    }

    public QChannel(PathMetadata metadata) {
        super(Channel.class, metadata);
    }

}

